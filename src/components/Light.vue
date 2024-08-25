<script setup>

const model = defineModel()

</script>

<template>
        <div class="light" >
            <div class="blub" :class="{on: model.status}" :style="{filter: `brightness(${model.brightness * 0.012})`}"></div>
            <p class="text">{{ model.name }}</p>
            <p class="text">亮度: {{ model.brightness }}</p>
        </div>
</template>

<style>
.light {
    width: 100px;
    height: 200px;
}
.blub {
    background-color:gray;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 30px;
}
.text {
    text-align: center;
}
.on {
    background-color: yellow;
}
</style>
