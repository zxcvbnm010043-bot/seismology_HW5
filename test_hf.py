import os
from dotenv import load_dotenv
from huggingface_hub import HfApi

load_dotenv()
token = os.getenv("HUGGINGFACE_TOKEN")
url = os.getenv("HUGGINGFACE_CODE")

print(f"Token exists: {bool(token)}")
print(f"URL: {url}")

if token:
    api = HfApi()
    try:
        user = api.whoami(token=token)
        print(f"Logged in as: {user['name']}")
        
        if url and "huggingface.co/spaces/" in url:
            repo_id = url.split("huggingface.co/spaces/")[-1].strip("/")
            print(f"Targeting repo: {repo_id}")
            files = api.list_repo_files(repo_id=repo_id, repo_type="space", token=token)
            print(f"Files in repo: {files}")
    except Exception as e:
        print(f"Error: {e}")
else:
    print("No token found in .env")
