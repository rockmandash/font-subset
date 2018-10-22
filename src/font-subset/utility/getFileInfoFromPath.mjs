const getFileInfoFromPath = filepath => {
  const splittedPath = filepath.split('/');
  const file = splittedPath[splittedPath.length - 1];
  const splittedFile = file.split('.');

  const extension = splittedFile[splittedFile.length - 1];

  return {
    filename: file.slice(0, file.length - extension.length - 1),
    extension: extension
  };
};

export default getFileInfoFromPath;
