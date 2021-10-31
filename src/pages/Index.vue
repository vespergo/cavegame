<template>
  <Layout>
    <g-image src="~/img/cave.jpg" width="760" />

    <div class="title">
      <h1>CaveGame</h1>
      <p class="play-mode">
        Survival Mode
      </p>
      <p class="play-mode">
        Creative Mode
      </p>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Hello, world!",
  },
};
</script>

<style>
.title {
  color: white;
  text-align: center;
}
.title {
  position: relative;
  top: -400px;
  left: 20p;
}
.home-links a {
  margin-right: 1rem;
}
.play-mode {
  margin: 10px 20px;
  padding: 5px;
  border: 1px solid white;
  font-size: 20px;
}
</style>
