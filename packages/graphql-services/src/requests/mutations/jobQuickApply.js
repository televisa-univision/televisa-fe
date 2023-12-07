export default `
  mutation quickApply($utmSource: String, $user: UserApplyInput!, $job: JobApplyInput!, $resume: ResumeApplyInput) {
    quickApply (utmSource: $utmSource, user: $user, job: $job, resume: $resume) {
      token
    }
  }
`;
