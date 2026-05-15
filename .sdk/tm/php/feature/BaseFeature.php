<?php
declare(strict_types=1);

// NidApplicationSystem SDK base feature

class NidApplicationSystemBaseFeature
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

    public function init(NidApplicationSystemContext $ctx, array $options): void {}
    public function PostConstruct(NidApplicationSystemContext $ctx): void {}
    public function PostConstructEntity(NidApplicationSystemContext $ctx): void {}
    public function SetData(NidApplicationSystemContext $ctx): void {}
    public function GetData(NidApplicationSystemContext $ctx): void {}
    public function GetMatch(NidApplicationSystemContext $ctx): void {}
    public function SetMatch(NidApplicationSystemContext $ctx): void {}
    public function PrePoint(NidApplicationSystemContext $ctx): void {}
    public function PreSpec(NidApplicationSystemContext $ctx): void {}
    public function PreRequest(NidApplicationSystemContext $ctx): void {}
    public function PreResponse(NidApplicationSystemContext $ctx): void {}
    public function PreResult(NidApplicationSystemContext $ctx): void {}
    public function PreDone(NidApplicationSystemContext $ctx): void {}
    public function PreUnexpected(NidApplicationSystemContext $ctx): void {}
}
