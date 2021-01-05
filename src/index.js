import transmuteScript from './core/transmute';
import backupFilesAndCleanProjectScript from './cleanup/backupFilesAndCleanProject';
import addScript from './add/add';

export default {
	transmute : transmuteScript,
	backupFilesAndCleanProject : backupFilesAndCleanProjectScript,
	add : addScript
};

export const transmute = transmuteScript;
export const backupFilesAndCleanProject = backupFilesAndCleanProjectScript;
export const add = addScript