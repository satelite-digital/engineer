import transmuteScript from './core/transmute';
import backupFilesAndCleanProjectScript from './cleanup/backupFilesAndCleanProject';

export default {
	transmute : transmuteScript,
	backupFilesAndCleanProject : backupFilesAndCleanProjectScript
};

export const transmute = transmuteScript;
export const backupFilesAndCleanProject = backupFilesAndCleanProjectScript;