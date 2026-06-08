import os
from dotenv import load_dotenv
from huggingface_hub import HfApi

load_dotenv()
token = os.getenv("HUGGINGFACE_TOKEN")
url = os.getenv("HUGGINGFACE_CODE")

if token and url and "huggingface.co/spaces/" in url:
    repo_id = url.split("huggingface.co/spaces/")[-1].strip("/")
    api = HfApi()
    
    print(f"Uploading files to {repo_id}...")
    
    # 建立上傳清單
    files_to_upload = ["app.py", "README.md", "EE_word.txt"]
    
    # 上傳根目錄檔案
    for file in files_to_upload:
        if os.path.exists(file):
            print(f"Uploading {file}...")
            api.upload_file(
                path_or_fileobj=file,
                path_in_repo=file,
                repo_id=repo_id,
                repo_type="space",
                token=token
            )
    
    # 上傳圖片目錄
    picture_dir = "EE_picture"
    if os.path.isdir(picture_dir):
        print(f"Uploading directory {picture_dir}...")
        api.upload_folder(
            folder_path=picture_dir,
            path_in_repo=picture_dir,
            repo_id=repo_id,
            repo_type="space",
            token=token
        )
    
    print("Done!")
else:
    print("Missing token or URL.")
