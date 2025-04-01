export const sendState = ({ state }) => {
    // debugger;
    const channel = new BroadcastChannel('state');
    let isOriginal = true;

    channel.postMessage('another-tab');
    // note that listener is added after posting the message

    channel.addEventListener('message', (msg) => {
        debugger;

        if (msg.data === 'another-tab' && isOriginal) {
           
            channel.postMessage('already-open');
        }
        if (msg.data === 'already-open') {
           
        }
    });
};
