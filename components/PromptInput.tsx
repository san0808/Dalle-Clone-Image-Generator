"use client";
import fetchsuggestion from '@/lib/fetchsuggestion';
import fetchImages from "@/lib/fetchImagedata";
import React, { FormEvent } from 'react'
import useSWR from 'swr'
import toast from "react-hot-toast";

function PromptInput() {
  const [prompt, setPrompt] = React.useState('')
  const [isGenerating, setIsGenerating] = React.useState(false);
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("suggestion", fetchsuggestion, {
    revalidateOnFocus: false,
  });
  console.log(suggestion)
  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    setIsGenerating(true);
    const inputPrompt = prompt;
    setPrompt('');
    const notificationPrompt = useSuggestion ? suggestion ?? '' : inputPrompt;
    const notificationPromptShort = notificationPrompt.slice(0, 20);
  
    const notification = toast.loading(`DALL·E is creating: ${notificationPromptShort}...`);
  
    try {
      const res = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: useSuggestion ? suggestion ?? '' : inputPrompt }),
      });
  
      const data = await res.json();
  
      if (data.error) {
        toast.error(data.error);
      } else {
        // Store the generated image in MongoDB
        await fetch('/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: data.imageUrl }),
        });
  
        toast.success(`Your AI Art has been Generated!`, { id: notification });
      }
    } catch (error) {
      console.error('Error generating or storing image:', error);
      toast.error('An error occurred while generating or storing the image.');
    } finally {
      setIsGenerating(false);
      updateImages();
  }
};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  const loading = isValidating || isLoading;

  return (
    <div className='m-10'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col shadow-md shadow-slate-400/10 border rounded-md'
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt..."
          className='flex-1 p-4 outline-none rounded-t-md'
        />
        
        {suggestion && (
          <div className="bg-gray-100 p-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Suggestion: <span className="font-medium text-orange-500">{suggestion}</span>
            </p>
            <button
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="text-orange-500 hover:text-orange-600"
            >
              Use Suggestion
            </button>
          </div>
        )}
  
        <div className="flex">
          <button
            className={`flex-1 p-4 ${
              prompt && !isGenerating
                ? 'bg-orange-500 text-white transition-colors duration-200'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            type='submit'
            disabled={prompt.length === 0 || isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
  
          <button
            className='flex-1 p-4 bg-white text-orange-500 border-l transition-colors duration-200 font-bold'
            type='button'
            onClick={() => mutate()}
            disabled={isLoading || isValidating}
          >
            {isLoading || isValidating ? 'Loading...' : 'New Suggestion'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromptInput