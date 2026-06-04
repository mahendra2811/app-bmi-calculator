import React, { ReactNode, Children } from 'react';
import FadeIn from './FadeIn';

interface StaggerListProps {
  children: ReactNode;
  staggerDelay?: number;
}

export default function StaggerList({ children, staggerDelay = 100 }: StaggerListProps) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <FadeIn delay={index * staggerDelay} key={index}>
          {child}
        </FadeIn>
      ))}
    </>
  );
}
