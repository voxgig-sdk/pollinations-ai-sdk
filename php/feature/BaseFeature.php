<?php
declare(strict_types=1);

// PollinationsAi SDK base feature

class PollinationsAiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PollinationsAiContext $ctx, array $options): void {}
    public function PostConstruct(PollinationsAiContext $ctx): void {}
    public function PostConstructEntity(PollinationsAiContext $ctx): void {}
    public function SetData(PollinationsAiContext $ctx): void {}
    public function GetData(PollinationsAiContext $ctx): void {}
    public function GetMatch(PollinationsAiContext $ctx): void {}
    public function SetMatch(PollinationsAiContext $ctx): void {}
    public function PrePoint(PollinationsAiContext $ctx): void {}
    public function PreSpec(PollinationsAiContext $ctx): void {}
    public function PreRequest(PollinationsAiContext $ctx): void {}
    public function PreResponse(PollinationsAiContext $ctx): void {}
    public function PreResult(PollinationsAiContext $ctx): void {}
    public function PreDone(PollinationsAiContext $ctx): void {}
    public function PreUnexpected(PollinationsAiContext $ctx): void {}
}
