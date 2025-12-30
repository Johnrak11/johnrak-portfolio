<template>
  <footer class="border-t">
    <div class="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>© {{ new Date().getFullYear() }} Johnrak. All rights reserved.</div>
        <div class="flex gap-4">
          <router-link class="hover:text-foreground" to="/reset">/reset</router-link>
          <a class="hover:text-foreground" href="#top">Back to top</a>
        </div>
      </div>
    </div>
  </footer>
</template>
