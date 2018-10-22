import { statSync, mkdirSync } from 'fs';

const checkDirectorySync = directory => {
  try {
    statSync(directory);
  } catch (e) {
    mkdirSync(directory);
  }
};
export default checkDirectorySync;
