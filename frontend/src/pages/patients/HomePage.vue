<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <div class="container_banner">
      <BannerComponent class="banner"></BannerComponent>
    </div>
    <!-- <ChatWidget></ChatWidget> -->
    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import BannerComponent from "@/components/patients/BannerComponent.vue";
import ChatWidget from "@/components/patients/chatbot/ChatWidget.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ChatWidget,
  },
  mounted() {
    // Load Amazon Connect script dynamically
    (function (w, d, x, id) {
      let s = d.createElement("script");
      s.src =
        // "https://dtn7rvxwwlhud.cloudfront.net/amazon-connect-chat-interface-client.js";
        'https://dtn7rvxwwlhud.cloudfront.net/amazon-connect-chat-interface-client.js';
      s.async = 1;
      s.id = id;
      d.getElementsByTagName("head")[0].appendChild(s);
      w[x] =
        w[x] ||
        function () {
          (w[x].ac = w[x].ac || []).push(arguments);
        };
    })(
      window,
      document,
      "amazon_connect",
      '11a33eb3-0e02-4e85-a725-cf1abeaef613'
      // "6d33ac2d-c04d-4325-9b2c-3bf44b6fba2a"
    );

    // Configure the Amazon Connect chat interface
    amazon_connect("styles", {
      iconType: "CHAT_VOICE",
      openChat: { color: "#ffffff", backgroundColor: "#123456" },
      closeChat: { color: "#ffffff", backgroundColor: "#123456" },
    });
    amazon_connect(
      "snippetId",
      'QVFJREFIaWFZYXRVSlpIekdkUUg5YXhZenVQMktKRXNIWTVFQWpBYVErTEdzRnpvZHdIdVFldmhiLy9rS3hsNWhQYVRFSm4wQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNbGhKQ2NXTHlZY1IyM0thbUFnRVFnQ3ZOOWZFemZDdWhQNVFtbkRiWVpjSENMYWQ3aUR0elZHR25TM1drNElkU0hXM3AzYTZHSExlakR2V2M6Ok43YWM0ZVlzUnJwOWRzOWZCWDE4clpseFdkSmQyNmpBUFVuanBVU2NiNkp1VVdJY2o1VmhaZzZRUUlielZCZ1F3SmlsNGxCK0VKNytic215V3VRb2dHN3Q5aGJmUWFzc3hkWll3VFZuZGRlSmNhVjc1dkMzOEtid3pXNlNNaFZEbGs3ODZOZEF2YnhrWndmYW5yMndwQ0pJc1loVCs4dz0='
      // "QVFJREFIaWFZYXRVSlpIekdkUUg5YXhZenVQMktKRXNIWTVFQWpBYVErTEdzRnpvZHdIN2RwUHRTOXhUVFAxcGdCeW85U1ErQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNZ29kMkh1RzZKZE9GaUZIZ0FnRVFnQ3RyTGV5a05jbHRCTXp6RkFPc09xejA1d3ltcllpR1pYSzRMS1UyMFEyc1N6cFJNdHl1Q2Q5YTQzN3U6OmV0cWVOUlNrcDZyVmJhc25ydWZzREZEZHFSU2R4SnFBTWRCUXdlcnY0MTFrWHZOZTYrTW51M250YnRqYUZJTlovQVU4NWVlV2xTVmRsc2pLUU15TG9NZThTVXgrbVA3VkZOdjl6TXhVM3hKdXd6VTBFWjRMSUxRMVBaY2lHaFZudENyc2xtS1JMVkYxYnVERFd5RmZ3eDRHS2JUWmdLaz0="
    );
    amazon_connect("supportedMessagingContentTypes", [
      "text/plain",
      "text/markdown",
      "application/vnd.amazonaws.connect.message.interactive",
      "application/vnd.amazonaws.connect.message.interactive.response",
    ]);
  },
};
</script>

<style scoped>
.container_body {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container_header,
.container_footer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.container_banner {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.container_banner .banner {
  width: 100%;
  background-color: rgb(231, 228, 228);
}
</style>