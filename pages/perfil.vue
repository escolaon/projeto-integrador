<template>

  <form @submit="onSubmit">
    <div class="grid w-full items-center gap-4">
      <div class="flex flex-col space-y-1.5">
        <UiLabel for="email"> Email </UiLabel>
        <UiInput id="email" type="email" auto-capitalize="none" auto-complete="email" auto-correct="off" class="h-12"
          value="name@example.com" @blur="onBlur" />
      </div>

      <UiButton type="submit" class="h-12">
        <p>Salvar</p>
      </UiButton>
    </div>
  </form>

</template>

<script>

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Formulário enviado");
  }

</script>