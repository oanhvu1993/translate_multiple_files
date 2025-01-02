async function retryAfterDelay(second) {
    console.log("Retry failed files in: ");
    for (let i = second; i > 0; i--) {
        setTimeout(() => {
            console.log(i);
        }, 1000*i);
    }
}
retryAfterDelay(15);