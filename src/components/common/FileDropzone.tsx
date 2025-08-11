import { FileText, Upload, X } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";

/**
 * FileDropzone
 * Reusable drag-and-drop + click-to-upload component with previews for images/videos.
 * - Validates file types and size
 * - Limits total files
 * - Emits errors to parent for display
 */
export interface FileDropzoneProps {
  files: File[]; // Controlled list of files
  onFilesChange: (files: File[]) => void; // Notify parent when files change
  maxFiles?: number; // Default 5
  maxSizeMB?: number; // Default 10
  accept?: string; // Default "image/*,video/*"
  className?: string; // Optional extra classes for container
  /**
   * Kích thước thumbnail theo px cho từng ô preview trong drop area.
   * Mặc định: 96 (tương đương ~w-24/h-24)
   */
  thumbSize?: number;
  /**
   * Căn lưới thumbnail trong drop area: left | center | right
   * Mặc định: left
   */
  thumbAlign?: "left" | "center" | "right";
  /**
   * URL preview ban đầu khi chưa chọn file (ví dụ ảnh hiện có từ server)
   * Không ảnh hưởng tới logic files; chỉ để hiển thị cho người dùng biết ảnh hiện tại.
   */
  initialPreviewUrl?: string;
  /**
   * Alt text cho initial preview (tùy chọn)
   */
  previewAlt?: string;
  /**
   * Callback xóa preview ban đầu (URL hiện có). Nếu truyền vào, sẽ hiển thị nút X để xóa.
   */
  onClearInitialPreview?: () => void;
}

const DEFAULT_ACCEPT = "image/*,video/*";

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 10,
  accept = DEFAULT_ACCEPT,
  className = "",
  thumbSize = 96,
  thumbAlign = "left",
  initialPreviewUrl,
  previewAlt,
  onClearInitialPreview,
}) => {
  const [dragActive, setDragActive] = useState(false); // UI state for drag highlight
  const inputRef = useRef<HTMLInputElement>(null); // Hidden input reference
  const [errors, setErrors] = useState<string[]>([]); // Nội bộ: lỗi để hiển thị trực tiếp

  // Validate size and type; keep logic small and focused
  const validateFile = useCallback(
    (file: File): string | null => {
      const maxBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxBytes)
        return `File "${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`;

      const acceptList = accept
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
      const isValid = acceptList.some(type => {
        if (type.includes("*"))
          return file.type.startsWith(type.replace("*", ""));
        return file.name.toLowerCase().endsWith(type);
      });
      if (!isValid) return `File "${file.name}" is not a supported format.`;
      return null;
    },
    [accept, maxSizeMB]
  );

  // Merge new files with validation and maxFiles guard
  const mergeFiles = useCallback(
    (incoming: File[]) => {
      const errors: string[] = [];
      const valid: File[] = [];

      incoming.forEach(f => {
        const err = validateFile(f);
        if (err) errors.push(err);
        else valid.push(f);
      });

      if (files.length + valid.length > maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed.`);
      }

      const allowed = Math.max(0, maxFiles - files.length);
      const nextFiles = [...files, ...valid.slice(0, allowed)];

      onFilesChange(nextFiles);
      setErrors(errors); // Cập nhật lỗi để render trong component
    },
    [files, maxFiles, onFilesChange, validateFile]
  );

  // Handle file input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files ? Array.from(e.target.files) : [];
      if (list.length === 0) return;
      mergeFiles(list);
      // Allow selecting the same file again
      if (inputRef.current) inputRef.current.value = "";
    },
    [mergeFiles]
  );

  // Drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const list = e.dataTransfer?.files
        ? Array.from(e.dataTransfer.files)
        : [];
      if (list.length === 0) return;
      mergeFiles(list);
    },
    [mergeFiles]
  );

  // Remove file by index
  const removeAt = useCallback(
    (i: number) => {
      const next = files.filter((_, idx) => idx !== i);
      onFilesChange(next);
      // Xóa lỗi khi người dùng thao tác xóa để tránh hiển thị sai ngữ cảnh
      setErrors([]);
    },
    [files, onFilesChange]
  );

  // Tính số cột grid theo maxFiles và cố định kích thước mỗi cột theo thumbSize (px)
  // Giúp canh đều theo số lượng cho phép và cho phép tuỳ chỉnh kích thước tile từ props
  const tileSize = Math.max(32, thumbSize); // đảm bảo tối thiểu 32px để tránh ô quá nhỏ
  const gridCols = `repeat(${Math.max(1, maxFiles)}, ${tileSize}px)`;
  const justifyClass =
    thumbAlign === "center"
      ? "justify-center"
      : thumbAlign === "right"
      ? "justify-end"
      : "justify-start";

  return (
    <div className={className}>
      {/* Drop area */}
      <div
        className={`relative border-2 border-dashed rounded-md p-2 transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()} // Click vùng drop để mở file picker
      >
        {/* Input ẩn: kích hoạt bằng onClick vùng drop để cho phép tương tác với thumbnail */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleInputChange}
          className="sr-only"
        />

        {/* Nội dung vùng drop: nếu chưa có file -> initial preview (nếu có) hoặc hướng dẫn; có file -> thumbnails */}
        {files.length === 0 ? (
          initialPreviewUrl ? (
            <div className={`flex ${justifyClass}`}>
              <div
                className="grid gap-2 w-fit"
                style={{ gridTemplateColumns: `repeat(1, ${tileSize}px)` }}
              >
                <div
                  className="relative border border-border rounded-sm overflow-hidden bg-background"
                  style={{ width: tileSize, height: tileSize }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Hiển thị preview URL sẵn có để người dùng biết ảnh hiện tại; vẫn có thể click vùng ngoài để thay */}
                  <img
                    src={initialPreviewUrl}
                    alt={previewAlt || "Preview"}
                    className="w-full h-full object-cover"
                  />
                  {/* Nút xoá preview ban đầu nếu có handler */}
                  {onClearInitialPreview && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onClearInitialPreview();
                      }}
                      className="absolute top-1 right-1 p-0.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                      aria-label="Remove initial preview"
                      type="button"
                    >
                      <X className="w-1.5 h-1.5" />
                    </button>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] p-0.5 truncate text-center">
                    Click to replace
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2 select-none">
              <Upload className="w-5 h-5 mx-auto text-muted-foreground" />
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-foreground">
                  Drop files here or click to browse
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Support images and videos up to {maxSizeMB}MB
                </p>
              </div>
            </div>
          )
        ) : (
          <div className={`flex ${justifyClass}`}>
            <div
              className="grid gap-2 overflow-x-auto w-fit"
              style={{ gridTemplateColumns: gridCols }}
            >
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative group border border-border rounded-sm overflow-hidden bg-background"
                  style={{ width: tileSize, height: tileSize }}
                  onClick={e => e.stopPropagation()} // Tránh mở file picker khi bấm vào ô
                >
                  {file.type.startsWith("image/") ? (
                    <div className="w-full h-full">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : file.type.startsWith("video/") ? (
                    <div className="w-full h-full relative cursor-pointer group">
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover"
                        controlsList="nodownload nofullscreen"
                        preload="metadata"
                        onClick={e => {
                          e.stopPropagation();
                          (e.currentTarget as HTMLVideoElement).play();
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-1.5 bg-muted/30">
                      <FileText className="w-2.5 h-2.5 text-muted-foreground" />
                      <span className="text-[9px] text-center mt-0.5 text-muted-foreground truncate w-full">
                        {file.name}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeAt(index);
                    }}
                    className="absolute top-1 right-1 p-0.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                    aria-label="Remove file"
                    type="button"
                  >
                    <X className="w-1.5 h-1.5" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] p-0.5 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Messages hiển thị bên trong Dropzone */}
      {errors.length > 0 && (
        <div className="space-y-0.5 mt-1">
          {errors.map((err, idx) => (
            <p key={idx} className="text-xs text-destructive">
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
