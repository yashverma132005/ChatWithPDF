import UploadPanel from "./UploadPanel";
import ChatBox from "./ChatBox";


export default function ChatPage() {

    return (

        <div className="flex h-screen bg-black">

            <aside className="w-[360px] border-r border-zinc-800 bg-black text-white p-6">
                <UploadPanel />
            </aside>

            <main className="flex-1">
                <ChatBox />
            </main>

        </div>

    );
}