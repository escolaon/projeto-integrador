<script setup lang="ts">
export interface LogoProps {
  tipo?: 'icone' | 'texto' | 'completo';
  alinhamento?: 'esquerda' | 'centro' | 'direita';
  tamanho?: 'sm' | 'md' | 'lg';
  caminho?: string;
  texto?: string;
  icone?: string;
  class?: string;
}

withDefaults(defineProps<LogoProps>(), {
  tipo: 'completo',
  alinhamento: 'esquerda',
  tamanho: 'sm',
  caminho: '/',
  texto: 'Marca',
  icone: 'solar:map-point-school-broken',
  class: '',
});
</script>

<template>
<div>
  <NuxtLink :to="caminho">
    <HeaderLogoIcon v-if="tipo == 'completo'"/>
    <span class="primary text-lg font-medium">
      {{ texto }}
    </span>
  </NuxtLink>
</div>
</template>





<style scoped>

</style>



<!-- <template>
	<div class="flex items-center flex-none group dark:text-gray-100">
		<div class="mr-3">
			<NuxtImg
				v-if="author?.image"
				:class="[
					{
						'w-8 h-8 sm:h-10 sm:w-10': size === 'sm',
						'w-10 h-10 sm:h-14 sm:w-14': size === 'md',
						'w-12 h-12 sm:h-16 sm:w-16': size === 'lg',
					},
					'object-cover rounded-full dark:brightness-90',
				]"
				:src="author.image as string"
			/>
		</div>

		<div
			:class="[
				{
					'text-sm sm:text-base': size === 'sm',
					'text-base sm:text-lg': size === 'md',
					'text-lg sm:text-xl': size === 'lg',
				},
				' ',
			]"
		>
			<span class="font-semibold font-display">{{ author?.name }}</span>

			<span
				v-if="author?.job_title"
				:class="[
					{
						'text-xs': size === 'sm',
						'text-sm': size === 'md',
						'': size === 'lg',
					},
					'block   pt-0.5',
				]"
			>
				{{ author.job_title }}
			</span>
		</div>
	</div>
</template> -->
