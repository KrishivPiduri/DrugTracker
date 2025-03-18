import { Stack } from 'expo-router';
import React, { useState } from 'react';

export default function RootLayout() {

  return (
      <Stack screenOptions={{ headerShown: false }}/>
  );
}
