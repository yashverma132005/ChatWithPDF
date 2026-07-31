// import Link from "next/link";
// import { FileText, MessageSquare, Zap } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 px-6 py-32 text-center">
//         {/* Badge */}
//         {/* <div className="flex items-center gap-2 rounded-full border border-black/[.08] px-4 py-1.5 text-sm text-zinc-600 dark:border-white/[.145] dark:text-zinc-400">
//           <FileText size={14} />
//           Chat with any PDF in seconds
//         </div> */}

//         {/* Heading */}
//         <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
//           Talk to your documents like never before
//         </h1>

//         {/* Description */}
//         <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//           Upload any PDF and get instant answers, summaries, and insights —
//           no more scrolling through pages of text.
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <Link
//             href="/upload"
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 sm:w-auto"
//           >
//             <Zap size={16} />
//             Try it free
//           </Link>

//           <a
//             href="#how-it-works"
//             className="flex h-12 w-full items-center justify-center rounded-full border border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-auto"
//           >
//             How it works
//           </a>
//         </div>

//         {/* Features */}
//         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
//           <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/[.08] p-6 dark:border-white/[.145]">
//             <FileText className="text-zinc-500" size={20} />
//             <p className="text-sm font-medium text-black dark:text-zinc-50">
//               Upload any PDF
//             </p>
//             <p className="text-xs text-zinc-500">
//               Contracts, papers, reports, ebooks
//             </p>
//           </div>

//           <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/[.08] p-6 dark:border-white/[.145]">
//             <MessageSquare className="text-zinc-500" size={20} />
//             <p className="text-sm font-medium text-black dark:text-zinc-50">
//               Ask questions
//             </p>
//             <p className="text-xs text-zinc-500">
//               Get answers grounded in the document
//             </p>
//           </div>

//           <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/[.08] p-6 dark:border-white/[.145]">
//             <Zap className="text-zinc-500" size={20} />
//             <p className="text-sm font-medium text-black dark:text-zinc-50">
//               Instant results
//             </p>
//             <p className="text-xs text-zinc-500">
//               No waiting, no manual searching
//             </p>
//           </div>
//         </div>

//         {/* How It Works Section */}
//         <section
//           id="how-it-works"
//           className="mt-20 flex w-full flex-col items-center gap-8"
//         >
//           <h2 className="text-3xl font-bold text-black dark:text-white">
//             How it works
//           </h2>

//           <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
//             <div className="rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
//               <h3 className="mb-2 text-lg font-semibold">1. Upload</h3>
//               <p className="text-sm text-zinc-600 dark:text-zinc-400">
//                 Upload any PDF document securely.
//               </p>
//             </div>

//             <div className="rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
//               <h3 className="mb-2 text-lg font-semibold">2. AI Reads</h3>
//               <p className="text-sm text-zinc-600 dark:text-zinc-400">
//                 Our AI analyzes and indexes your document instantly.
//               </p>
//             </div>

//             <div className="rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
//               <h3 className="mb-2 text-lg font-semibold">3. Ask Anything</h3>
//               <p className="text-sm text-zinc-600 dark:text-zinc-400">
//                 Chat naturally with your PDF and get accurate answers.
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { FileText, MessageSquare, Zap } from "lucide-react";
import ChatPage from "./components/ChatPage";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <ChatPage />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 px-6 py-32 text-center">

        <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
          Talk to your documents like never before
        </h1>


        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Upload any PDF and get instant answers, summaries, and insights —
          no more scrolling through pages of text.
        </p>


        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">

          <button
            onClick={() => setShowChat(true)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 sm:w-auto"
          >
            <Zap size={16} />
            Try it free
          </button>


          <a
            href="#how-it-works"
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/[.08] px-6 transition-colors hover:bg-black/[.04] dark:border-white/[.145] sm:w-auto"
          >
            How it works
          </a>

        </div>


        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">

          <div className="flex flex-col items-center gap-2 rounded-2xl border p-6">
            <FileText className="text-zinc-500" size={20} />

            <p className="text-sm font-medium">
              Upload any PDF
            </p>

            <p className="text-xs text-zinc-500">
              Contracts, papers, reports, ebooks
            </p>
          </div>


          <div className="flex flex-col items-center gap-2 rounded-2xl border p-6">
            <MessageSquare className="text-zinc-500" size={20} />

            <p className="text-sm font-medium">
              Ask questions
            </p>

            <p className="text-xs text-zinc-500">
              Get answers grounded in the document
            </p>
          </div>


          <div className="flex flex-col items-center gap-2 rounded-2xl border p-6">
            <Zap className="text-zinc-500" size={20} />

            <p className="text-sm font-medium">
              Instant results
            </p>

            <p className="text-xs text-zinc-500">
              No waiting, no manual searching
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}