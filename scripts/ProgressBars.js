export function updateProgressBar(elementId, percentage) {
  const progressBar = document.getElementById(elementId);
  progressBar.style.width = `${percentage}%`;
  return;
}

export function updateAllProgressBars(progressPoint) {
  const progressBars = document.getElementsByClassName('progress');
  for (const progressBar of progressBars) {
    const id = progressBar.id;
    const key = id.replace('progress-', '');
    const percentage = progressPoint[key];
    updateProgressBar(id, percentage);
  }
}
