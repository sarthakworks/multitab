export const ExistingTabMaintainSession = ({ setIsVisible, formDataRef }) => {
    const channel = new BroadcastChannel("tab");
    let isOriginal = true;

    channel.addEventListener("message", (msg) => {

        if (msg.data === "new-tab-open" && isOriginal) {
            channel.postMessage("already-open");
        }

        if (msg.data === "already-open") {
            isOriginal = false;
            setIsVisible(true);
        }

        if (msg.data?.type === "original-closed") {
            Object.assign(formDataRef.current, msg.data.formData); // Restore formData in ref
        }
    });

    channel.postMessage("new-tab-open");

    const handleTabClose = () => {
        if (isOriginal) {
            channel.postMessage({ type: "original-closed", formData: formDataRef.current });
            // channel.close();
        }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return null;
};
