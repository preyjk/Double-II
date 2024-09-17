<template>
  <div className="flex flex-col items-center justify-center md:flex-row">
    <div className="flex flex-col md:w-2/3">
      <video className="w-full h-auto" autoPlay loop muted>
        <source :src="video" type="video/mp4" />
      </video>
    </div>
    <div className="flex flex-col md:w-1/3">

    </div>
  </div>
</template>

<script>
import HomeVideo from "@/assets/Home/1.mp4";

export default {
  name: "Home",
  data() {
    return {
      video: HomeVideo,
    };
  },

};
</script>