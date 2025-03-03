"use client";
import { useAddContentModal } from "@/context/AddContentContext";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { contentTypes } from "@/constant/constant";
import { contentSchema } from "@/schemas/contentSchema";
import axios from "axios";
import { useLoading } from "@/context/loadingContext";
import Loader from "./Loader";
import { useGroups } from "@/context/GroupContext";
import { useContent } from "@/context/ContentContext";

const label_input_style = "flex items-center justify-between gap-3 ";
const input_style = "text-sm px-2 py-1 h-fit border-none bg-gray-600 w-[80%]";

const AddContentCard = () => {
  const { setAddingContent } = useAddContentModal();
  const { toast } = useToast();
  const { setLoading } = useLoading();
  const { groups } = useGroups();
  const { fetchContents } = useContent();
  const form = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: "",
      url: "",
      notes: "",
      type: contentTypes[0],
      tags: "",
      group: "not grouped",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof contentSchema>) => {
    setLoading(true);
    try {
      await axios.post("/api/content", data);
      fetchContents();

      toast({
        title: "content added successfully",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "error while adding content",
        description: `${error?.response?.data?.message}`,
        variant: "destructive",
      });
    } finally {
      setAddingContent(false);
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed w-screen h-screen z-50 flex justify-center items-center "
      style={{
        backdropFilter: "blur(30px)",
      }}
    >
      <div className=" w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] h-fit py-10 px-10 max-mobile:px-4 md:px-16 flex flex-col gap-5 justify-center items-center border border-purple-950 rounded-2xl bg-gray-purple-600 shadow-xl duration-300 hover:shadow-2xl hover:shadow-purple-800 shadow-purple-800">
        <span className="capitalize text-2xl font-bold text-purple-400">
          Add Your Link
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[100%] px-3 flex flex-col justify-center items-center max-mobile:w-full"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[70%] max-mobile:w-full">
                  <div className={`${label_input_style}`}>
                    <FormLabel className="text-lg max-mobile:text-base capitalize">
                      Title
                    </FormLabel>
                    <Input {...field} required className={`${input_style}`} />
                  </div>
                  <FormMessage className="sm:ml-[20%]" />
                </FormItem>
              )}
            />

            <FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[70%] max-mobile:w-full">
                  <div className={`${label_input_style}`}>
                    <FormLabel className="text-lg max-mobile:text-base  capitalize">
                      URL
                    </FormLabel>
                    <Input {...field} required className={`${input_style}`} />
                  </div>
                  <FormMessage className="sm:ml-[20%]" />
                </FormItem>
              )}
            />

            <FormField
              name="notes"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[70%] max-mobile:w-full">
                  <div className={`${label_input_style}`}>
                    <FormLabel className="text-lg max-mobile:text-base capitalize">
                      Notes
                    </FormLabel>
                    <Input {...field} className={`${input_style}`} />
                  </div>
                  <FormMessage className="sm:ml-[20%]" />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[70%] max-mobile:w-full">
                  <div className={`${label_input_style}`}>
                    <FormLabel className="text-lg max-mobile:text-base capitalize">
                      Type
                    </FormLabel>
                    <select
                      {...field}
                      name="type"
                      id="type"
                      className={`${input_style} rounded`}
                    >
                      {contentTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="text-sm px-2 py-1 h-fit border-none bg-gray-600"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormMessage className="sm:ml-[20%]" />
                </FormItem>
              )}
            />

            <FormField
              name="group"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[70%] max-mobile:w-full">
                  <div className={`${label_input_style}`}>
                    <FormLabel className="text-lg max-mobile:text-base  capitalize">
                      Group
                    </FormLabel>
                    <select
                      {...field}
                      name="group"
                      id="group"
                      className={`${input_style} rounded`}
                    >
                      {groups.length > 0 ? (
                        groups.map((group: any) => (
                          <option
                            key={group._id}
                            value={group.name}
                            className="text-sm px-2 py-1 h-fit border-none max-mobile:text-sm bg-gray-600"
                          >
                            {group.name.length > 18
                              ? `${group.name.slice(0, 18)}...`
                              : group.name}
                          </option>
                        ))
                      ) : (
                        <option key={"notgroupedkey"} value="not grouped">
                          not grouped
                        </option>
                      )}
                    </select>
                  </div>
                  <FormMessage className="sm:ml-[20%]" />
                </FormItem>
              )}
            />
            <FormField
              name="tags"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[70%] max-mobile:w-full">
                  <div className={`${label_input_style}`}>
                    <FormLabel className="text-lg max-mobile:text-base capitalize">
                      Tags
                    </FormLabel>
                    <Input {...field} className={`${input_style}`} />
                  </div>
                  <FormMessage className="sm:ml-[20%]" />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <div className="flex gap-6">
              <Button type="submit" className="w-full mt-4">
                Add Content
              </Button>
              <Button
                className="w-full mt-4"
                onClick={() => {
                  setAddingContent(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddContentCard;
