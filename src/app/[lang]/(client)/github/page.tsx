import { BulkMergePrs } from '@/components/github/root/bulk-merge-prs/bulk-merge-prs'
import { GrantPermissionButton } from '@/components/github/root/grant-permission-button/grant-permission-button'
import { SignButton } from '@/components/github/root/sign-button/sign-button'

export default function Page() {
  return (
    <>
      <div className="space-x-2">
        <SignButton />
        <GrantPermissionButton />
      </div>

      <BulkMergePrs />
    </>
  )
}
