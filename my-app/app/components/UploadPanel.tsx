// import { Upload } from "lucide-react";

// export default function UploadPanel() {
//   return (
//     <div className="flex h-full flex-col">
//       <h1 className="mb-8 text-2xl font-bold">
//         Upload Document
//       </h1>

//       <div className="flex flex-1 flex-col justify-center">
//         <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 p-10 transition hover:border-black dark:border-zinc-700 dark:hover:border-white">
//           <Upload size={48} className="mb-4 text-zinc-500" />

//           <h2 className="text-lg font-semibold">
//             Drag & Drop your file
//           </h2>

//           <p className="mt-2 text-center text-sm text-zinc-500">
//             PDF or DOCX
//             <br />
//             Click to browse
//           </p>
//         </div>

//         <p className="mt-6 text-center text-sm text-zinc-500">
//           Maximum file size: 20 MB
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

export default function UploadPanel() {

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);


  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {

    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
    }

  };


  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }

  };


  const uploadFile = async () => {

    if (!file) {
      return;
    }


    const formData = new FormData();

    formData.append(
      "file",
      file
    );


    try {

      setUploading(true);


      const response = await fetch(
        "http://localhost:5000/upload",
        {
          method: "POST",
          body: formData,
        }
      );


      const data = await response.json();


      console.log(data);


      alert("File uploaded successfully");


    } catch (error) {

      console.log(error);

      alert("Upload failed");

    } finally {

      setUploading(false);

    }

  };



  return (

    <div className="flex h-full flex-col">

      <h1 className="text-2xl font-bold">
        Upload Document
      </h1>



      <input
        id="fileUpload"
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={handleFileChange}
      />



      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-8 flex h-60 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 transition hover:border-black dark:border-zinc-700 dark:hover:border-white"
      >


        <label
          htmlFor="fileUpload"
          className="flex cursor-pointer flex-col items-center"
        >

          <FileText
            size={45}
            className="mb-4 text-zinc-400"
          />


          {file ? (

            <>
              <p className="max-w-[250px] text-center font-medium break-words">
                {file.name}
              </p>

              <p className="mt-2 text-sm text-green-600">
                File selected
              </p>
            </>

          ) : (

            <>
              <p className="font-medium">
                Drag & Drop your file
              </p>

              <p className="text-sm text-zinc-500">
                PDF or DOCX
              </p>
            </>

          )}


        </label>


      </div>



      {file && (

        <button
          onClick={uploadFile}
          disabled={uploading}
          className="mt-6 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-zinc-800 disabled:opacity-50"
        >

          {uploading
            ? "Uploading..."
            : "Start Chat"
          }

        </button>

      )}


    </div>

  );
}