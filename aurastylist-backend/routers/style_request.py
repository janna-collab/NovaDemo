from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, Any
import logging
from services import nova
from core import database

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/")
async def create_style_request(
    target_type: str = Form(...),
    venue: str = Form(...),
    aesthetic: str = Form(...),
    
    # Own self fields
    gender: Optional[str] = Form(None),
    size: Optional[str] = Form(None),
    dress_type: Optional[str] = Form(None),
    price_range: Optional[str] = Form(None),
    reference_image: Optional[UploadFile] = File(None),
    
    # Someone else fields
    height: Optional[str] = Form(None),
    target_image: Optional[UploadFile] = File(None)
):
    try:
        user_id = "user_123"  # Mock user
        
        # Prepare context for orchestrator
        request_data = {
            "target_type": target_type,
            "venue": venue,
            "aesthetic": aesthetic,
            "gender": gender,
            "size": size,
            "dress_type": dress_type,
            "price_range": price_range,
            "height": height
        }

        image_to_process = reference_image if target_type == "myself" else target_image
        file_bytes = None
        filepath = None
        
        if image_to_process:
            file_bytes = await image_to_process.read()
            filepath = database.save_uploaded_image(file_bytes, image_to_process.filename)
            if target_type == "myself":
                request_data["reference_image_path"] = filepath
                request_data["myself_image_path"] = filepath
            else:
                request_data["target_image_path"] = filepath
                request_data["someone_image_path"] = filepath

        # EXECUTE AGENT ORCHESTRATION
        from services.nova import orchestrator
        result = await orchestrator.execute_style_flow(request_data, file_bytes)
        
        # Enrich metadata for response/DB
        response_data = {
            **request_data,
            "request_id": None,
            "status": result["status"],
            "recommendation": result["recommendation"],
            "images": result["images"], # base64 list
            "user_profile": result["user_profile"]
        }

        if result["user_profile"] and filepath:
            database.save_user_profile(f"{user_id}_{target_type}_{filepath}", result["user_profile"])

        # Save the full request to Mongo
        request_id = database.save_style_request(user_id, response_data)
        response_data["request_id"] = request_id

        return response_data

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Failed to process style request: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
