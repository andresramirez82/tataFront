import React, { ChangeEvent, useState, useRef } from "react";
// import "./upload.css";

interface ProfilePictureUploaderProps {
  onPictureUpload: (base64: string | null) => void;
}

const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({
  onPictureUpload,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<any>(null);
  const imgDefault =
    " data:image/jpeg;base64,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";
  const [image, setimage] = useState<string>(imgDefault);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onPictureUpload(base64);
        setimage(base64);
      };
      reader.readAsDataURL(file);
    } else {
      onPictureUpload(null);
    }
  };

  const Click = (e: any) => {
    e.preventDefault();
    inputRef.current.click();
  }

  return (
    <>
      <div className="row justify-content-center align-items-start">
        <div
          className="rounded-circle overflow-hidden position-relative"
          style={{ width: "150px", height: "150px" }}
        >
          <img src={image} className="w-100 h-100" alt="..." />
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <button
              className="btn rounded-circle btn-opacity"
              onClick={Click}
            >
              <span className="me-1">Cambiar</span>
              <i className="bi bi-camera-fill" />
            </button>
          </div>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
        ref={inputRef}
      />
    </>
  );
};

export default ProfilePictureUploader;