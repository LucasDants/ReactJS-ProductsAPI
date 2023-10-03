import React, { useEffect, useState, useRef } from "react";
import { Image } from "@chakra-ui/react";

const Dropzone = ({ file, onChangeHandler }: any) => {
  const inputRef = useRef(null);

  const onClickHandler = () => {
    // @ts-ignore
    inputRef.current.click();
  };

  return (
    <div className="">
      <div
        className="border border-dashed border-orange-500 relative "
        onClick={onClickHandler} // Ativa o input quando a div é clicada
      >
        <input
          ref={inputRef} // Associa a referência ao elemento input
          type="file"
          className="cursor-pointer relative block opacity-0 w-full h-full z-50"
          onChange={onChangeHandler}
        ></input>

        {file && (
          <Image
            width={300}
            height={300}
            src={file}
            alt="Selected Image"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        <div className="flex flex-col items-center justify-center">
          <svg
            className="fill-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            fill="#2e2b2b"
            viewBox="0 0 256 256"
          >
            <path d="M216,44H40A12,12,0,0,0,28,56V200a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A12,12,0,0,0,216,44ZM40,52H216a4,4,0,0,1,4,4V168.4l-32.89-32.89a12,12,0,0,0-17,0l-22.83,22.83-46.82-46.83a12,12,0,0,0-17,0L36,159V56A4,4,0,0,1,40,52ZM36,200V170.34l53.17-53.17a4,4,0,0,1,5.66,0L181.66,204H40A4,4,0,0,1,36,200Zm180,4H193l-40-40,22.83-22.83a4,4,0,0,1,5.66,0L220,179.71V200A4,4,0,0,1,216,204ZM148,100a8,8,0,1,1,8,8A8,8,0,0,1,148,100Z"></path>
          </svg>
          <p className="text-lg font-medium text-gray-600">
            Drop the image of your product
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
