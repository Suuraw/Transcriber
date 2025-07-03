import sys
import json
from youtube_transcript_api import YouTubeTranscriptApi

video_id = sys.argv[1]

try:
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    full_text = " ".join([entry['text'] for entry in transcript])
    print(json.dumps({"success": True, "transcript": full_text}))
except Exception as e:
    print(json.dumps({"success": False, "error": str(e)}))
