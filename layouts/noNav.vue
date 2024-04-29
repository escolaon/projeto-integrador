<template>
  <div>
    <div class="absolute
                h-full
                w-full
                bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)]
                [background-size:15px_15px]
                [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_50%,transparent_100%)]
                md:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,#tranparent_100%)]" />
    <slot />
  </div>
</template>

<script lang="ts" setup></script>