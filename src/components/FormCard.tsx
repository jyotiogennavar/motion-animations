"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { AnimatePresence, motion } from "framer-motion";

const FormCard = () => {
  // State variables
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [title, setTitle] = useState("Sample Title");
  const [description, setDescription] = useState(
    "This is a sample description that can be edited."
  );

  // Event handlers
  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    // Reset form values
    setTitle("");
    setDescription("");
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowSuccess(false);
  };

  // Render the component
  return (
    <Card className="w-full max-w-md ">
      {/* Success message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="flex items-center justify-center gap-2 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400 mx-6 -mt-2 mb-6 p-3 rounded-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            style={{
              willChange: "transform, opacity"
            }}
          >
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">
              Changes saved successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <CardHeader>
        <CardTitle className="text-xl">Form Card</CardTitle>
        <div className="space-y-2 mt-4">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <AnimatePresence>
          {/* {isEditing && ( */}
            <motion.div 
              className="space-y-2 mt-4 overflow-hidden"
              initial={{ 
                opacity: 0, 
                scaleY: 0,
                y: -10
              }}
              animate={{ 
                opacity: 1, 
                scaleY: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scaleY: 0,
                y: -10
              }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 350,
                opacity: { duration: 0.2 }
              }}
              style={{
                transformOrigin: "top",
                willChange: "transform, opacity"
              }}
            >
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                
              />
            </motion.div>
          {/* )} */}
        </AnimatePresence>

        <Button
          className="w-full mt-4"
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </CardHeader>
    </Card>
  );
};

export { FormCard };
