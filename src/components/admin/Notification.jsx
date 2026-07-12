export default function Notification({ notificationRef, styles, Icon, message }) {
  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2" ref={notificationRef}>
      <div
        className={`flex max-w-100 min-w-90  items-center gap-3 rounded-md border-l-6 px-5 py-4 shadow-xl backdrop-blur ${styles} `}
      >
        <Icon className="size-5 text-lg font-bold text-white" />

        <p className="flex-1 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
