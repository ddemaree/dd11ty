<script lang="ts">
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { icon } from '@fortawesome/fontawesome-svg-core';

export let title: string;
export let href: string;
export let isActive: boolean = false;
export let iconDef: IconDefinition = null;
</script>

<li class:active={isActive}>
  <a href={href}>
    {#if iconDef}{@html icon(iconDef).html}{/if}
    <span>{title}</span>
  </a>
</li>