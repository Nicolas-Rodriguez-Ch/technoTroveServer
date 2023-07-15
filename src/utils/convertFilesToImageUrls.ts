interface CloudinaryResponse {
  url: string;
}

const convertFilesToImagesUrls = (
  files: CloudinaryResponse[] | undefined
): string[] => {
  return Array.isArray(files)
    ? files.map((file: CloudinaryResponse) => file.url)
    : [];
};

export default convertFilesToImagesUrls;
