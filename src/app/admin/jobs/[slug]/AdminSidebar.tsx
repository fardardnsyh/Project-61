"use client";

import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "./actions";
import SubmitButton from "@/components/SubmitButton";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" defaultValue={jobId} />
      <SubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </SubmitButton>
      {formState?.error && (
        <p className="text-center text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" defaultValue={jobId} />
      <SubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </SubmitButton>
      {formState?.error && (
        <p className="text-center text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
