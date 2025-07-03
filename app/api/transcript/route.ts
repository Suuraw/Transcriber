import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // Extract YouTube video ID from URL
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );

    if (!match || !match[1]) {
      return NextResponse.json(
        { success: false, error: "Invalid YouTube URL." },
        { status: 400 }
      );
    }

    const videoId = match[1];

    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "fetch_transcript.py"
    );

    return await new Promise((resolve) => {
      const process = spawn("python3", [scriptPath, videoId]);

      let output = "";
      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (err) => {
        console.error("Python stderr:", err.toString());
      });

      process.on("close", () => {
        try {
          const parsed = JSON.parse(output);
          resolve(NextResponse.json(parsed));
        } catch (err) {
          resolve(
            NextResponse.json(
              { success: false, error: "Failed to parse transcript response." },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
