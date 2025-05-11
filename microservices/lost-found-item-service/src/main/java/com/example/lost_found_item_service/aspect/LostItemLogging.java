package com.example.lost_found_item_service.aspect;

import com.example.user_service.logging.LoggingAspect;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class LostItemLogging {
    private static final Logger logger = LoggerFactory.getLogger(LostItemLogging.class);

    @Pointcut("execution(* com.example.lost_found_item_service.service.*.*(..))")
    public void serviceMethods() {}

    @Before("serviceMethods()")
    public void logBefore(JoinPoint jp) {
        System.out.println("Entering: " + jp.getSignature());
        logger.info("Entering: {}", jp.getSignature());
    }

    @AfterReturning(pointcut="serviceMethods()", returning="result")
    public void logAfter(JoinPoint jp, Object result) {
        System.out.println("Exiting: " + jp.getSignature() + " returned " + result);
        logger.info("Exiting: {} returned {}", jp.getSignature(), result);
    }

    @Around("serviceMethods()")
    public Object logAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println(">> Start: " + pjp.getSignature());
        logger.info(">> Start: {}", pjp.getSignature());
        Object ret = pjp.proceed();
        System.out.println("<< End: " + pjp.getSignature());
        logger.info("<< End: {}", pjp.getSignature());
        return ret;
    }
}
