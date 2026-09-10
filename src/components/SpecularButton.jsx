import React, { useRef, useCallback } from 'react';
import './SpecularButton.css';

const SpecularButton = ({
  children = 'Get Started',
  size = 'md',
  radius = 999,
  tint = '#181412',
  tintOpacity = 1,
  blur = 0,
  textColor = '#ffffff',
  lineColor = '#FF3B8D',
  baseColor = '#333333',
  intensity = 1.2,
  shineSize = 14,
  shineFade = 36,
  thickness = 1.4,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  href,
  target,
  rel,
  style = {},
  ...rest
}) => {
  const btnRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    if (!followMouse) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--mouse-x', `${x}px`);
    btn.style.setProperty('--mouse-y', `${y}px`);
    btn.style.setProperty('--sb-glow-opacity', '1');
  }, [followMouse]);

  const handlePointerEnter = useCallback((e) => {
    handlePointerMove(e);
  }, [handlePointerMove]);

  const handlePointerLeave = useCallback(() => {
    const btn = btnRef.current;
    if (btn) {
      btn.style.setProperty('--sb-glow-opacity', '0');
    }
  }, []);

  const Comp = href ? 'a' : 'button';

  return (
    <Comp
      ref={btnRef}
      href={href}
      target={target}
      rel={rel}
      type={href ? undefined : type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={{
        '--sb-radius': typeof radius === 'number' ? `${radius}px` : radius,
        '--sb-tint': tint,
        '--sb-tint-opacity': tintOpacity,
        '--sb-blur': `${blur}px`,
        '--sb-text-color': textColor,
        '--sb-line-color': lineColor,
        '--sb-base-color': baseColor,
        ...style
      }}
      {...rest}
    >
      <span className="specular-button__label">{children}</span>
    </Comp>
  );
};

export default SpecularButton;
