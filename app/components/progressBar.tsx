// progress bar component

interface ProgressBarProps {
    progress: number;
    threshold: number;
  }


export default function ProgressBar({ progress, threshold }: ProgressBarProps) {
    return(
        <div>
            <p>Exercises Completed: {progress}/{threshold}</p>
            <div className="relative w-full h-4 bg-gray-300 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-indigo-500 rounded-lg transition-width"
                style={{ width: `${(progress/threshold)*100}%` }}
              />
            </div>
        </div>
    )
}