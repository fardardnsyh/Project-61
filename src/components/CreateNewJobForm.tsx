"use client";

import { createJobPosting } from "@/app/jobs/new/actions";
import LoadingButton from "@/components/LoadingButton";
import LocationInput from "./LocationInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { CreateJobType, createJobSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { draftToMarkdown } from "markdown-draft-js";
import { useForm } from "react-hook-form";
import RichTextEditor from "./RichTextEditor";
import callGemini from "@/function/gemini";
import GeminiButton from "./GeminiButton";
import { useState, useEffect } from "react";
import {
  convertFromHTML,
  ContentState,
  convertToRaw,
  RawDraftContentState,
} from "draft-js";
import { useToast } from "@/components/ui/use-toast";

export default function NewJobForm() {
  const { toast } = useToast();

  const form = useForm<CreateJobType>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    register,
    formState: { isSubmitting, errors },
  } = form;

  const [AIGeneratedContent, setAIGeneratedContent] = useState(
    watch("description"),
  );
  const [rawDraftContent, setRawDraftContent] = useState<
    RawDraftContentState | undefined
  >(undefined);
  const [showLoader, setShowLoader] = useState(false);

  async function onSubmit(values: CreateJobType) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobPosting(formData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Please try again later or try updating the job description.",
      });
    }
  }

  async function handleAutoComplete(values: CreateJobType) {
    let detailsObject: any = {};
    const requiredFields: (keyof CreateJobType)[] = [
      "title",
      "type",
      "companyName",
      "experience",
      "salary",
      "location",
      "locationType",
    ];

    // Check if all required fields are filled
    for (const key of requiredFields) {
      if (!values[key]) {
        toast({
          variant: "destructive",
          title: "Uh oh! Required Fields Missing.",
          description:
            "Please fill all fields before using the AI-generated job description feature.",
        });
        setShowLoader(false);
        return;
      }
      setShowLoader(true);
    }

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        detailsObject[key] = value;
      }
    });

    // Concatenate job details into the prompt
    const {
      title,
      type,
      companyName,
      experience,
      location,
      locationType,
      salary,
      applicationEmail,
      applicationUrl,
    } = values;

    const prompt = `
    Generate a job description in HTML tags with proper formatting under 1500 words for a ${title}, ${type} at ${companyName}.
    Experience required: ${experience}.
    Location: ${locationType === "Remote" ? "Remote" : location}.
    Salary: ${salary} in INR.
    How to apply: ${
      applicationEmail
        ? `Email: ${applicationEmail}`
        : applicationUrl
          ? `Website: ${applicationUrl}`
          : "Not provided"
    }
    Expected skills include related to ${title} and experience.
    Note: Make the section headings bold and the content under them in list.
    Note: The job description should be engaging and informative and do not include any other information or customised text like "Please modify as needed or something else".
  `;

    try {
      const description = await callGemini(prompt);
      setAIGeneratedContent(description);
      setFocus("description");
      setShowLoader(false);
    } catch (error) {
      console.error("Error fetching job description:", error);
    }
  }

  useEffect(() => {
    if (AIGeneratedContent) {
      const blocksFromHTML = convertFromHTML(AIGeneratedContent);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      const rawContentState = convertToRaw(contentState);
      setRawDraftContent(rawContentState);
    }
  }, [AIGeneratedContent]);

  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Find Your Right Fit Candidate
        </h1>
        <p className="text-muted-foreground">
          Reach thousands of qualified job seekers with your job posting.
        </p>
      </div>

      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes?.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Fresher or 3+ years" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Microsoft" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyLogoUrl"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Company logo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      onChange={(e) => {
                        field.onChange(e);
                        // if (e.currentTarget.value === "Remote") {
                        // trigger("location");
                        // }
                      }}
                    >
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes.map((locationType) => (
                        <option key={locationType} value={locationType}>
                          {locationType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setValue("location", "", { shouldValidate: true });
                        }}
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Salary per month or annum"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-5">
                    <Label onClick={() => setFocus("description")}>
                      Description
                    </Label>

                    <GeminiButton
                      onClick={() => handleAutoComplete(watch())}
                      showLoader={showLoader}
                    />
                  </div>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      AIGeneratedContent={rawDraftContent}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
