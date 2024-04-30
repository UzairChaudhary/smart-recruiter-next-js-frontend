"use client"
import React, { useMemo } from "react";
import Speech, { HighlightedText } from "react-text-to-speech";

export default function App() {
  const text = useMemo(
    () => (
      <div>
        <span>This library is awesome!</span>
        <div>
          <div>
            <span>It can also read and highlight </span>
            <span>nested text... </span>
            <span>
              <span>upto </span>
              <span>
                any
                <span> level.</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    ),
    []
  );

  return (
    <>
      <Speech id="unique-id" text={text} highlightText={true} />
      <HighlightedText id="unique-id">{text}</HighlightedText>
    </>
  );
}