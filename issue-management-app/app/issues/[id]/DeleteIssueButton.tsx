"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button
            className="bg-red-500 rounded-md py-2 text-white text-xs font-bold"
            disabled={isDeleting}
          >
            Delete Issue
            {isDeleting && <Spinner />}
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            정말 삭제하시길 원하십니까?
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <button className="bg-white border border-gray-500 rounded-md px-4">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <button
                className="bg-red-500 rounded-md px-2 text-white text-xs font-bold"
                onClick={deleteIssue}
              >
                Delete Issue
              </button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            이슈를 삭제할 수 없습니다.
          </AlertDialog.Description>
          <button
            className="mt-2 bg-gray-200 border border-gray-300 rounded-md px-3 py-1 text-sm"
            onClick={() => setError(false)}
          >
            OK
          </button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
