# YouTube Transcription Tool

A personal YouTube video transcription tool built with Next.js, React, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine (version 18 or higher).

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   \`\`\`bash
   npm install
   pip install youtube-transcript-api
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ ├── login/
│ │ └── page.tsx
│ └── transcribe/
│ └── page.tsx
├── components/
│ └── ui/
│ ├── button.tsx
│ ├── input.tsx
│ ├── textarea.tsx
│ └── card.tsx
├── lib/
│ └── utils.ts
└── ...config files
\`\`\`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features

- **Minimalistic Design**: Clean, modern interface
- **Responsive**: Works on desktop and mobile
- **Developer Authentication**: Simple password protection
- **YouTube URL Input**: Interface for video transcription
- **Personal Use**: Built for individual use with humorous messaging

## 🔧 Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## 📝 Notes

This is a personal tool template. To add real transcription functionality, you'll need to integrate with:

- YouTube Data API
- OpenAI Whisper API or similar transcription service
- Proper authentication system

## 🚫 Personal Use Only

This tool is designed for personal use. The humorous messaging throughout the app reflects this intention!
