from ghapi.all import GhApi
from os import getenv
from dotenv import load_dotenv

load_dotenv()

USERNAME = getenv("GITHUB_USERNAME") or "blacksmithop"

api = GhApi()

ALLOWED_REPO_KEYS = ["name", "full_name", "description", "fork", "created_at", "updated_at", "pushed_at", "url", "homepage", "size", "stargazers_count", "watchers_count", "language", "forks_count"]

def get_github_projects():
    repos = []
    for i in range(1, 5):
        result = api.repos.list_for_user(username=USERNAME, per_page=100, page=i)
        result = list(result)  # fastcore.foundation.L -> List
        result_len = len(result)
        print(f"Found {result_len} repos on page {i}")
        print(i)
        if result_len:
            repos.extend(result)
        else:
            break
        
    filtered_repos = []
    for repo in repos:
        repo = {k:v  for k,v in repo.items() if k in ALLOWED_REPO_KEYS}
        repo["url"] = repo["url"].replace("api.", "").replace("repos/", "")
        filtered_repos.append(repo)
        
    sorted_repos = sorted(filtered_repos, key=lambda d: d["stargazers_count"], reverse=True)
    return sorted_repos

ALLOWED_PROFILE_KEYS = ["avatar_url", "name", "company", "blog", "location", "bio", "twitter_username", "public_repos", "public_gists", "followers", "following", "created_at", "updated_at"]
def get_profile_data():
    raw_profile_data =  api.users.get_by_username("blacksmithop")
    profile_data = {k:v for k,v in raw_profile_data.items() if k in ALLOWED_PROFILE_KEYS}
    return profile_data
    