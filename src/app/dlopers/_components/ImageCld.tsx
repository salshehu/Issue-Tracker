"use client";
import { Button } from "@radix-ui/themes";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import React, { useState } from "react";

interface CloudinaryResult {
  publicId: string;
}

const ImageCld = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="Uploaded image not available"
        />
      )}
      <CldUploadWidget
        uploadPreset="djwmg0vw"
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.publicId);
        }}
      >
        {({ open }) => <Button onClick={() => open()}>Upload..</Button>}
      </CldUploadWidget>
    </>
  );
};

export default ImageCld;
