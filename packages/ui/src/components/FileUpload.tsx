import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File as FileIcon, Image as ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

export interface FileUploadProps {
  id?: string;
  value?: File | File[] | null;
  onChange?: (files: File | File[] | null) => void;
  accept?: string;
  maxSize?: number; // em bytes
  multiple?: boolean;
  preview?: boolean;
  disabled?: boolean;
  className?: string;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      id,
      onChange,
      accept,
      maxSize = 5 * 1024 * 1024, // 5MB padrão
      multiple = false,
      preview = false,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<string[]>([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: accept ? { [accept]: [] } : undefined,
      maxSize,
      multiple,
      disabled,
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles);
        onChange?.(multiple ? acceptedFiles : acceptedFiles[0] || null);

        // Gerar previews para imagens
        if (preview && acceptedFiles.length > 0) {
          const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
          setPreviews(newPreviews);
        }
      },
    });

    const removeFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onChange?.(multiple ? newFiles : null);

      // Remover preview
      if (previews[index]) {
        URL.revokeObjectURL(previews[index]);
        setPreviews((prev) => prev.filter((_, i) => i !== index));
      }
    };

    // Cleanup previews
    React.useEffect(() => {
      return () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview));
      };
    }, [previews]);

    const isImage = (file: File) => file.type.startsWith("image/");
    const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
      <div ref={ref} id={id} className={cn("space-y-4", className)}>
        {/* Drop zone */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isDragActive ? (
                "Solte os arquivos aqui..."
              ) : (
                <>
                  Arraste arquivos ou <span className="text-primary font-medium">clique para selecionar</span>
                </>
              )}
            </p>
            {maxSize && (
              <p className="text-xs text-muted-foreground">
                Tamanho máximo: {formatSize(maxSize)}
              </p>
            )}
          </div>
        </div>

        {/* Lista de arquivos */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50"
              >
                {preview && isImage(file) && previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : isImage(file) ? (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                ) : (
                  <FileIcon className="h-6 w-6 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };

