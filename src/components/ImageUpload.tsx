
import { useState, useRef } from "react";
import { Upload, Image, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
}

export const ImageUpload = ({ images, onImagesChange }: ImageUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList) => {
    const newImages: UploadedImage[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast({
            title: "File too large",
            description: `${file.name} is larger than 5MB`,
            variant: "destructive",
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            url: e.target?.result as string,
            name: file.name,
            size: file.size,
          };
          newImages.push(newImage);
          
          if (newImages.length === Array.from(files).filter(f => f.type.startsWith('image/')).length) {
            onImagesChange([...images, ...newImages]);
            toast({
              title: "Images uploaded",
              description: `${newImages.length} image(s) added successfully`,
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (imageId: string) => {
    onImagesChange(images.filter(img => img.id !== imageId));
    toast({
      title: "Image removed",
      description: "Image has been removed from the page",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const insertImageToEditor = (imageUrl: string) => {
    // This would integrate with the rich text editor
    // For now, we'll just copy the image URL to clipboard
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: "Image URL copied",
      description: "You can now paste it in your page content",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Image className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>Manage Images</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Upload Area */}
          <Card 
            className={`border-2 border-dashed transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <CardContent className="p-8 text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Upload Images
              </h3>
              <p className="text-slate-600 mb-4">
                Drag and drop images here, or click to select files
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                Supports JPG, PNG, GIF up to 5MB each
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
              />
            </CardContent>
          </Card>

          {/* Images Grid */}
          {images.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-900 mb-3">
                Uploaded Images ({images.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <Card key={image.id} className="group relative overflow-hidden">
                    <CardContent className="p-2">
                      <div className="aspect-square relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-full object-cover rounded"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="secondary">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <img src={image.url} alt={image.name} className="w-full h-auto" />
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => insertImageToEditor(image.url)}
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => removeImage(image.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-xs font-medium text-slate-900 truncate">
                          {image.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatFileSize(image.size)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
