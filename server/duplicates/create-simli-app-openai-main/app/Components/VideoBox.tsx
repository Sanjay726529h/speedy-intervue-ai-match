
export default function VideoBox(props: any) {
    return (
        <div className="aspect-video flex rounded-sm overflow-hidden items-center h-[600px] w-[600px] justify-center bg-simligray">
            <video ref={props.video} autoPlay playsInline></video>
            <audio ref={props.audio} autoPlay ></audio>
        </div>
    );
}