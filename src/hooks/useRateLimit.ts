import { useState, useCallback } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number;
}

/**
 * Custom hook for client-side rate limiting
 * Helps prevent form spam and abuse
 */
export const useRateLimit = (config: RateLimitConfig) => {
  const { maxAttempts, windowMs, blockDurationMs = 60000 } = config;
  
  const [state, setState] = useState<RateLimitState>({
    attempts: 0,
    lastAttempt: 0,
  });

  const checkRateLimit = useCallback((): { allowed: boolean; remainingAttempts: number; resetTime?: number } => {
    const now = Date.now();
    
    // Check if currently blocked
    if (state.blockedUntil && now < state.blockedUntil) {
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: state.blockedUntil,
      };
    }

    // Reset window if enough time has passed
    if (now - state.lastAttempt > windowMs) {
      setState({
        attempts: 0,
        lastAttempt: now,
      });
      return {
        allowed: true,
        remainingAttempts: maxAttempts - 1,
      };
    }

    // Check if limit exceeded
    if (state.attempts >= maxAttempts) {
      const blockedUntil = now + blockDurationMs;
      setState(prev => ({
        ...prev,
        blockedUntil,
      }));
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: blockedUntil,
      };
    }

    return {
      allowed: true,
      remainingAttempts: maxAttempts - state.attempts - 1,
    };
  }, [state, maxAttempts, windowMs, blockDurationMs]);

  const recordAttempt = useCallback(() => {
    setState(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      lastAttempt: Date.now(),
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      attempts: 0,
      lastAttempt: 0,
    });
  }, []);

  return {
    checkRateLimit,
    recordAttempt,
    reset,
    isBlocked: state.blockedUntil ? Date.now() < state.blockedUntil : false,
  };
};